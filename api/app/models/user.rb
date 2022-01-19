class User < ApplicationRecord
    belongs_to :client, optional: true
    belongs_to :mentum, optional: true
end
