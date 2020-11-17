class Review < ApplicationRecord
  belongs_to :user
  #has_one　:spot, dependent: :destroy
end
