class Client < ApplicationRecord
    belongs_to :users , foreign_key: "uuid"
    has_many :likes
    has_many :contracts
    has_many :nones
    has_many :reviews
    has_many :client_tags
end
