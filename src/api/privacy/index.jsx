import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../baseRequest";
import { toast } from "react-toastify";

// List all legal documents
export const useListLegalDocuments = () => {
  return useQuery({
    queryKey: ["legal-documents"],
    queryFn: () =>
      request({
        url: "/admin/legal-documents",
      }),
  });
};

// Create new legal document
export const useCreateLegalDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-legal-document"],
    mutationFn: (params) =>
      request({
        url: "/admin/legal-documents",
        method: "post",
        params, // type, language, content, version
      }),
    onSuccess: () => {
      toast.success("Document created");
      queryClient.invalidateQueries({ queryKey: ["legal-documents"] });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Error creating document");
    },
  });
};

// Update existing legal document
export const useUpdateLegalDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-legal-document"],
    mutationFn: ({ id, params }) =>
      request({
        url: `/admin/legal-documents/${id}`,
        method: "put", // or patch depending on backend
        params, // type, language, content, version
      }),
    onSuccess: () => {
      toast.success("Document updated");
      queryClient.invalidateQueries({ queryKey: ["legal-documents"] });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Error updating document");
    },
  });
};
