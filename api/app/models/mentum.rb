class Mentum < ApplicationRecord
    belongs_to :user, foreign_key: "user_id", optional: true 
    has_many :likes
    has_many :contracts
    has_many :nones
    has_many :reviews
    has_many :menta_tag
end
