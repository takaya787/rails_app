FactoryBot.define do
  factory :user do
    name { "user" }
    email { "testmail@example.com" }
    password { "foobar" }
    password_confirmation { "foobar" }
  end
end
