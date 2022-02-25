class None < ApplicationRecord
    has_many :mentum, foreign_key: "menta_id"
    has_many :client, foreign_key: "client_id"
end
