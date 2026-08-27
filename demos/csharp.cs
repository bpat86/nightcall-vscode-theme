#nullable enable

using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Runtime.CompilerServices;
using System.Threading;

namespace Nightcall.Demo;

public sealed record Project(Guid Id, required string Name, ProjectStatus Status)
{
    public string Slug => Name.Trim().ToLowerInvariant().Replace(' ', '-');
}

public sealed class ProjectService(HttpClient httpClient)
{
    /// <summary>Streams active projects from the API.</summary>
    public async IAsyncEnumerable<Project> GetActiveProjectsAsync(
        [EnumeratorCancellation] CancellationToken cancellationToken = default)
    {
        Project[] projects =
            await httpClient.GetFromJsonAsync<Project[]>("api/projects", cancellationToken)
            ?? [];

        foreach (Project project in projects)
        {
            if (project.Status is ProjectStatus.Active)
            {
                yield return project with { Name = project.Name.Trim() };
            }
        }
    }
}

public enum ProjectStatus
{
    Draft,
    Active,
    Archived,
}
