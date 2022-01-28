class MessagesController < ApplicationController
    def index
        contract = Contract.find_by(client_id: params[:client_id], menta_id: params[:menta_id])
        like = Like.find_by(client_id: params[:client_id], menta_id: params[:menta_id])

        if contract.nil?
            contract = Contract.find_by()
        end

        render json: { contract: contract, like: like }
        end
        
    end

end
