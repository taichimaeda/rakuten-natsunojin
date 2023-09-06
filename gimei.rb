gem 'gimei'
require 'gimei'

names = []
addresses = []

10_000.times do |_|
  names.push(Gimei.name.kanji)
  address = Gimei.address
  addresses.push("#{address.prefecture.kanji}, #{address.city.kanji}#{address.town.kanji}")
end

File.open('./cypress/fixtures/names.csv', 'w+') do |f|
  f.write(names.join("\n"))
end
File.open('./cypress/fixtures/addresses.csv', 'w+') do |f|
  f.write(addresses.join("\n"))
end
