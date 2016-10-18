json.array!(@heros) do |hero|
  json.extract! hero, :id, :name, :birthday, :country, :school, :description, :constellation
  json.url hero_url(hero, format: :json)
end
