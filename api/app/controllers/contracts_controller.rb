class ContractsController < ApplicationController
    def index
        contract = Contract.find_by(menta_id: params[:menta_id], client_id: params[:client_id], status: true)
        render json: contract
    end

    def create
        if contruct = Contract.find_by(create_contruct_param)
        else
            Contract.create(create_contruct_param, status: true)
        end
        render json: contruct
    end



    private
    def create_contruct_param
        params.require(:contract).permit(:client_id, :menta_id)
    end
end
