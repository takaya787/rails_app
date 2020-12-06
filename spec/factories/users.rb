FactoryBot.define do
  factory :user do
    reviews {[
      FactoryBot.build(:review, user: nil)
    ]}
    name { "user" }
    email { "testuser@example.com" }
    password { "foobar" }
    password_confirmation { "foobar" }
    initialize_with { User.find_or_create_by(email: email)}
  end
  factory :host, class: User do
    name { "host" }
    email { "testhost@example.com" }
    password { "foobar" }
    password_confirmation { "foobar" }
    admin { true }
  end
end
