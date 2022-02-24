class Client < ApplicationRecord
    belongs_to :user , foreign_key: "user_id", optional: true 
    has_many :likes, foreign_key: "user_id"
    has_many :contracts, foreign_key: "user_id"
    has_many :nones, foreign_key: "user_id"
    has_many :reviews
    # has_many :client_tags
end
