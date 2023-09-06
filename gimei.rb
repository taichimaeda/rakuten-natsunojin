gem 'gimei'
require 'gimei'
require 'json'

names = []
addresses = []

10.times do |_|
  name = Gimei.name
  names.push(name.kanji)
  address = Gimei.address
  addresses.push({ prefecture: address.prefecture.kanji, street: address.city.kanji + address.town.kanji })
end

File.open('./names.json', 'w+') do |f|
  JSON.dump(names, f)
end
File.open('./addresses.json', 'w+') do |f|
  JSON.dump(addresses, f)
end
