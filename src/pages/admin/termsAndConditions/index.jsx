import {
  alpha,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import {
  Editor,
  EditorState,
  RichUtils,
  ContentState,
  convertFromHTML,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { useEffect, useState } from "react";
import { VscListOrdered } from "react-icons/vsc";
import { AiOutlineUnorderedList } from "react-icons/ai";
import {
  useListLegalDocuments,
  useCreateLegalDocument,
  useUpdateLegalDocument,
} from "../../../api/privacy"; // ✅ reuse same hooks & apis
import LoadingDataError from "../../../components/LoadingDataError";
import { stateToHTML } from "draft-js-export-html";
import { useTranslation } from "react-i18next";
import useGetDarkValue from "../../../utils/useGetDarkValue";
import { request } from "../../../api/baseRequest";

const TextEditorButton = styled(IconButton)(({ theme }) => ({
  borderRadius: "6px",
  backgroundColor: alpha(theme.palette.primary.light, 0.05),
  fontSize: "14px",
  minWidth: "30px",
}));

const Terms = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [editorStateAR, setEditorStateAR] = useState(() =>
    EditorState.createEmpty()
  );

  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const { data, isLoading, isError, refetch } = useListLegalDocuments();
  const createDoc = useCreateLegalDocument();
  const updateDoc = useUpdateLegalDocument();
  const { getVlaue } = useGetDarkValue();

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(
      selectedLanguage === "ar" ? editorStateAR : editorState,
      command
    );
    if (newState) {
      selectedLanguage === "ar"
        ? setEditorStateAR(newState)
        : setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const toggleInlineStyle = (style) => {
    selectedLanguage === "ar"
      ? setEditorStateAR(RichUtils.toggleInlineStyle(editorStateAR, style))
      : setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleBlockType = (blockType) => {
    selectedLanguage === "ar"
      ? setEditorStateAR(RichUtils.toggleBlockType(editorStateAR, blockType))
      : setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const handleSave = async () => {
    const htmlContentEN = stateToHTML(editorState.getCurrentContent());
    const htmlContentAR = stateToHTML(editorStateAR.getCurrentContent());

    const existingEn = data?.data?.data.find(
      (d) => d.type === "terms_conditions" && d.language === "en"
    );
    const existingAr = data?.data?.data.find(
      (d) => d.type === "terms_conditions" && d.language === "ar"
    );

    if (existingEn) {
      const newVersion = (parseInt(existingEn.version, 10) || 1) + 1;
      await updateDoc.mutateAsync({
        id: existingEn.id,
        params: {
          type: "terms_conditions",
          language: "en",
          content: htmlContentEN,
          version: newVersion.toString(),
        },
      });
    } else {
      await createDoc.mutateAsync({
        type: "terms_conditions",
        language: "en",
        content: htmlContentEN,
        version: "1",
      });
    }

    if (existingAr) {
      const newVersion = (parseInt(existingAr.version, 10) || 1) + 1;
      await updateDoc.mutateAsync({
        id: existingAr.id,
        params: {
          type: "terms_conditions",
          language: "ar",
          content: htmlContentAR,
          version: newVersion.toString(),
        },
      });
    } else {
      await createDoc.mutateAsync({
        type: "terms_conditions",
        language: "ar",
        content: htmlContentAR,
        version: "1",
      });
    }
  };

  // Populate editors with existing content
  useEffect(() => {
    if (!isLoading && !isError && data?.data) {
      const existingEn = data.data.data.find(
        (d) => d.type === "terms_conditions" && d.language === "en"
      );
      const existingAr = data.data.data.find(
        (d) => d.type === "terms_conditions" && d.language === "ar"
      );

      if (existingEn?.url) {
        request(existingEn.url).then((res) => {
          const blocksFromHTML = convertFromHTML(res.data);
          const contentState = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
          );
          setEditorState(EditorState.createWithContent(contentState));
        });
      }

      if (existingAr?.url) {
        request(existingAr.url).then((res) => {
          const blocksFromHTML_AR = convertFromHTML(res.data);
          const contentStateAr = ContentState.createFromBlockArray(
            blocksFromHTML_AR.contentBlocks,
            blocksFromHTML_AR.entityMap
          );
          setEditorStateAR(EditorState.createWithContent(contentStateAr));
        });
      }
    }
  }, [isLoading, isError, data]);

  if (isLoading) {
    return <Typography>{t("global.loading")} ...</Typography>;
  }

  if (isError) {
    return <LoadingDataError refetch={refetch} />;
  }

  return (
    <Box>
      <Button
        sx={{ mb: 2 }}
        variant="contained"
        loading={createDoc.isPending || updateDoc.isPending}
        onClick={handleSave}
      >
        {t("gbtn.save")}
      </Button>
      <Divider />
      <Box
        sx={{
          minHeight: "400px",
          backgroundColor: "background.paper",
          mt: 2,
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: (theme) =>
            `1px 1px 15px -5px ${getVlaue(
              theme.palette.grey[800],
              theme.palette.grey[400]
            )}`,
        }}
      >
        <Box>
          <Stack flexDirection="row" gap={1} alignItems="flex-start">
            <Stack gap={0.5} flexDirection="column" sx={{ p: 1 }}>
              <Stack flexDirection="row" gap={0.5}>
                <TextEditorButton onClick={() => toggleInlineStyle("BOLD")}>
                  B
                </TextEditorButton>
                <TextEditorButton onClick={() => toggleInlineStyle("ITALIC")}>
                  I
                </TextEditorButton>
              </Stack>
              <Stack flexDirection="row" gap={0.5}>
                <TextEditorButton
                  onClick={() => toggleBlockType("ordered-list-item")}
                >
                  <VscListOrdered />
                </TextEditorButton>
                <TextEditorButton
                  onClick={() => toggleBlockType("unordered-list-item")}
                >
                  <AiOutlineUnorderedList />
                </TextEditorButton>
              </Stack>
            </Stack>
            <Stack gap={0.5} flexDirection="column" sx={{ p: 1 }}>
              <Stack gap={0.5} flexDirection="row">
                <TextEditorButton onClick={() => toggleBlockType("header-one")}>
                  h1
                </TextEditorButton>
                <TextEditorButton onClick={() => toggleBlockType("header-two")}>
                  h2
                </TextEditorButton>
                <TextEditorButton
                  onClick={() => toggleBlockType("header-three")}
                >
                  h3
                </TextEditorButton>
              </Stack>
              <Stack gap={0.5} flexDirection="row">
                <TextEditorButton
                  onClick={() => toggleBlockType("header-four")}
                >
                  h4
                </TextEditorButton>
                <TextEditorButton
                  onClick={() => toggleBlockType("header-five")}
                >
                  h5
                </TextEditorButton>
                <TextEditorButton onClick={() => toggleBlockType("header-six")}>
                  h6
                </TextEditorButton>
              </Stack>
            </Stack>
          </Stack>
        </Box>
        <Box
          sx={{
            p: 1,
            backgroundColor: getVlaue("grey.900", "grey.100"),
            "& .DraftEditor-root": { minHeight: "400px" },
          }}
        >
          <Stack flexDirection="row" justifyContent="center" gap={1} mb={2}>
            <Button
              variant={selectedLanguage === "ar" ? "contained" : "outlined"}
              onClick={() => setSelectedLanguage("ar")}
            >
              العربية
            </Button>
            <Button
              variant={selectedLanguage === "en" ? "contained" : "outlined"}
              onClick={() => setSelectedLanguage("en")}
            >
              English
            </Button>
          </Stack>
          <Editor
            editorState={
              selectedLanguage === "ar" ? editorStateAR : editorState
            }
            onChange={
              selectedLanguage === "ar" ? setEditorStateAR : setEditorState
            }
            handleKeyCommand={handleKeyCommand}
            placeholder={t("editor.placeholder")}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Terms;
