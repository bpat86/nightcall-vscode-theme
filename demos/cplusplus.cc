#include <algorithm>
#include <compare>
#include <iostream>
#include <ranges>
#include <string>
#include <string_view>
#include <vector>

enum class Status { draft, active, archived };

struct Project {
  std::string name;
  Status status{Status::draft};

  auto operator<=>(const Project&) const = default;
};

template <typename Value>
concept Named = requires(const Value& value) {
  { value.name } -> std::convertible_to<std::string_view>;
};

template <std::ranges::input_range Range>
  requires Named<std::ranges::range_value_t<Range>>
auto active_names(const Range& projects) {
  std::vector<std::string_view> names;

  for (const auto& project : projects) {
    if (project.status == Status::active) {
      names.emplace_back(project.name);
    }
  }

  return names;
}

int main() {
  std::vector projects{
      Project{.name = "Palette", .status = Status::active},
      Project{.name = "Documentation", .status = Status::draft},
      Project{.name = "Extension", .status = Status::active},
  };

  std::ranges::sort(projects, {}, &Project::name);

  for (const std::string_view name : active_names(projects)) {
    std::cout << name << '\n';
  }
}
