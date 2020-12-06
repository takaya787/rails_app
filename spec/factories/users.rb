FactoryBot.define do
  factory :user do
    name { "user" }
    email { "testuser@example.com" }
    password { "foobar" }
    password_confirmation { "foobar" }
  end
  factory :host, class: User do
    name { "host" }
    email { "testhost@example.com" }
    password { "foobar" }
    password_confirmation { "foobar" }
    admin { true }
  end
end
