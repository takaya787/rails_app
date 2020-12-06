FactoryBot.define do
  factory :review do
    user
    reason  { "test review" }
    duration { 1 }
    advice { "this is a test advice" }
    food { "this is a test food column" }
    convenient { "this is a test convenient column " }
    favorite { "this is a test favorite column" }
    score { 2.5 }
  end
end
