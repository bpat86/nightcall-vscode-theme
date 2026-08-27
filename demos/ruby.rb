# frozen_string_literal: true

Project = Data.define(:name, :status, :tags)

module Nightcall
  class ProjectCatalog
    include Enumerable

    def initialize(projects = [])
      @projects = projects.freeze
    end

    def each(&) = @projects.each(&)

    def active_names
      filter_map do
        _1 in Project[name:, status: :active, **]
        name
      end
    end

    def self.from_rows(rows)
      projects = rows.map do |name:, status: :draft, tags: []|
        Project.new(name:, status:, tags: tags.freeze)
      end

      new(projects)
    end
  end
end

catalog = Nightcall::ProjectCatalog.from_rows([
  { name: 'Palette', status: :active, tags: %w[color theme] },
  { name: 'Docs', tags: [] }
])

catalog.active_names.each { puts "Active: #{_1}" }
end
