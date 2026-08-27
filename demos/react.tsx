import { useActionState, useDeferredValue, useId, useState } from "react";

type Project = {
  id: string;
  name: string;
  status: "active" | "archived";
};

type ProjectPickerProps = {
  projects: readonly Project[];
  onSelect: (project: Project) => void;
};

type SaveState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const initialState: SaveState = { status: "idle" };

async function saveProject(
  _previousState: SaveState,
  formData: FormData,
): Promise<SaveState> {
  const projectId = formData.get("projectId");

  if (typeof projectId !== "string" || projectId.length === 0) {
    return { status: "error", message: "Choose a project." };
  }

  await fetch(`/api/projects/${encodeURIComponent(projectId)}`, {
    method: "POST",
  });

  return { status: "success", message: "Project saved." };
}

export function ProjectPicker({ projects, onSelect }: ProjectPickerProps) {
  const searchId = useId();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [saveState, formAction, isPending] = useActionState(
    saveProject,
    initialState,
  );
  const visibleProjects = projects.filter(
    ({ name, status }) =>
      status === "active" &&
      name.toLocaleLowerCase().includes(deferredQuery.toLocaleLowerCase()),
  );

  return (
    <section aria-labelledby={`${searchId}-heading`}>
      <h2 id={`${searchId}-heading`}>Choose a project</h2>

      <label htmlFor={searchId}>Search</label>
      <input
        id={searchId}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.currentTarget.value)}
      />

      <form action={formAction}>
        <ul>
          {visibleProjects.map((project) => (
            <li key={project.id}>
              <label>
                <input
                  type="radio"
                  name="projectId"
                  value={project.id}
                  onChange={() => onSelect(project)}
                />
                {project.name}
              </label>
            </li>
          ))}
        </ul>

        <button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save project"}
        </button>
      </form>

      {saveState.status !== "idle" && (
        <p role={saveState.status === "error" ? "alert" : "status"}>
          {saveState.message}
        </p>
      )}
    </section>
  );
}
