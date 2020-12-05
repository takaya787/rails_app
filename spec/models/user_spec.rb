require 'rails_helper'

RSpec.describe User, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"
  it "userが作成されるかテスト" do
    before_counts = User.count
    user = User.create(
      name: "test user",
      email: "testmail@example.com",
      password: "foobar",
      password_confirmation: "foobar",
    )
    after_counts = User.count
    user.destroy
    expect(after_counts - before_counts).to eq 1
  end
  #user validates項目を検証
  it "user mail address抜きで作成" do
    before_counts = User.count
    user = User.create(
      name: "test user",
      password: "foobar",
      password_confirmation: "foobar",
    )
    after_counts = User.count
    user.destroy
    expect(after_counts - before_counts).to eq 0
  end

  # it "user password_confirmation抜きで作成" do
  #   before_counts = User.count
  #   user = User.create(
  #     name: "test user",
  #     email: "testmail@example.com",
  #     password: "foobar",
  #   )
  #   after_counts = User.count
  #   user.destroy
  #   expect(after_counts - before_counts).to eq 0
  # end

  it "passwordとpassword_confirmation異なって作成" do
    before_counts = User.count
    user = User.create(
      name: "test user",
      email: "testmail@example.com",
      password: "foobar",
      password_confirmation: "foo",
    )
    after_counts = User.count
    user.destroy
    expect(after_counts - before_counts).to eq 0
  end

  it "passwordが短い" do
    before_counts = User.count
    user = User.create(
      name: "test user",
      email: "testmail@example.com",
      password: "foo",
      password_confirmation: "foo",
    )
    after_counts = User.count
    user.destroy
    expect(after_counts - before_counts).to eq 0
  end
end
