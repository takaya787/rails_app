class User < ApplicationRecord
  has_many :sns_credits, dependent: :destroy
  has_secure_password
  validates(:name, presence: true,length: {maximum: 50 })
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates(:email, presence: true, length: { maximum: 255 }, format: {with: VALID_EMAIL_REGEX }, uniqueness: true)

  validates(:password, presence: true, length: { minimum: 6 }, allow_nil: true,)
  #oauthによるユーザー作成、ログイン
  def self.find_or_create_from_auth(auth)
    password = SecureRandom.alphanumeric(8)
    provider = auth[:provider]
    uid = auth[:uid]
    name = auth[:info][:name]
    email = auth[:info][:email]
    sns = SnsCredit.find_by(provider: provider, uid: uid)
    if sns
      user = User.find_by(id: sns.user_id )
      user.name = name
      user.email = email
      return user
    else
      user = User.create(name: name, email: email, password: password, password_confirmation: password)
      user.sns_credits.create(uid: uid, provider: provider)
      return user
    end
  end
end
