<#
.SYNOPSIS
Fetches active projects from a JSON API.
.EXAMPLE
PS> .\powershell.ps1 -ApiUri "https://api.example.com/projects"
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory)]
    [ValidateNotNullOrEmpty()]
    [uri] $ApiUri,

    [ValidateRange(1, 100)]
    [int] $Limit = 20
)

$ErrorActionPreference = 'Stop'

try {
    $headers = @{
        Accept = 'application/json'
        'User-Agent' = 'Nightcall-Demo/1.0'
    }

    $response = Invoke-RestMethod -Uri $ApiUri -Headers $headers -Method Get
    $projects = @(
        $response |
            Where-Object Status -EQ 'active' |
            Select-Object -First $Limit -Property Id, Name, UpdatedAt
    )

    foreach ($project in $projects) {
        [pscustomobject]@{
            Id = [int] $project.Id
            Name = [string] $project.Name
            UpdatedAt = [datetime] $project.UpdatedAt
        }
    }
}
catch {
    Write-Error "Request failed: $($_.Exception.Message)"
    exit 1
}
