class Contract < ApplicationRecord
    belongs_to :mentum, foreign_key: "uuid"
    belongs_to :client, foreign_key: "uuid" 
end
