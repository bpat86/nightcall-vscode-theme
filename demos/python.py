from collections.abc import Iterable
from dataclasses import dataclass
from enum import StrEnum, auto
from pathlib import Path
import json


class Status(StrEnum):
    ACTIVE = auto()
    ARCHIVED = auto()


@dataclass(frozen=True, slots=True)
class Project:
    name: str
    status: Status = Status.ACTIVE
    tags: tuple[str, ...] = ()

    @classmethod
    def from_mapping(cls, value: dict[str, object]) -> "Project":
        match value:
            case {"name": str(name), "status": str(status), **metadata}:
                tags = tuple(str(tag) for tag in metadata.get("tags", []))
                return cls(name=name, status=Status(status), tags=tags)
            case _:
                raise ValueError(f"Invalid project: {value!r}")


def load_projects(path: Path) -> Iterable[Project]:
    with path.open(encoding="utf-8") as source:
        values: list[dict[str, object]] = json.load(source)

    return (Project.from_mapping(value) for value in values)


if __name__ == "__main__":
    for project in load_projects(Path("projects.json")):
        print(f"{project.name}: {project.status}")
