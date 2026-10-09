import { getTemplate } from "@/lib/templates/catalog";
import { newId, now, type IAtlasStore, type Workflow } from "@/lib/db/store";

export class ServiceError extends Error {
  constructor(public code: "not_found" | "conflict" | "forbidden", message: string) {
    super(message);
  }
}

/** Installs a template as an immutable snapshot of its current version into one workspace. */
export async function installTemplate(store: IAtlasStore, workspaceId: string, slug: string): Promise<Workflow> {
  const template = getTemplate(slug);
  if (!template || template.status !== "published") throw new ServiceError("not_found", "template not found");
  return store.mutate((db) => {
    if (!db.workspaces.some((w) => w.id === workspaceId)) throw new ServiceError("not_found", "workspace not found");
    const workflow: Workflow = {
      id: newId("wf"),
      workspaceId,
      templateSlug: template.slug,
      templateVersion: template.version,
      name: template.name.id,
      enabled: true,
      definition: structuredClone(template),
      createdAt: now(),
    };
    db.workflows.push(workflow);
    return workflow;
  });
}

export async function setWorkflowEnabled(store: IAtlasStore, workspaceId: string, workflowId: string, enabled: boolean) {
  return store.mutate((db) => {
    const wf = db.workflows.find((w) => w.id === workflowId && w.workspaceId === workspaceId);
    if (!wf) throw new ServiceError("not_found", "workflow not found");
    wf.enabled = enabled;
  });
}
