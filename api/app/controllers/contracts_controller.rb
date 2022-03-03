class ContractsController < ApplicationController
    def index
        unless contract = Contract.find_by(client_id: params[:client_id])
            contract = Contract.find_by(menta_id: params[:menta_id], client_id: params[:client_id])
        end
        render json: contract
    end

    def create
        if contract = Contract.find_by(client_id: create_contract_param[:client_id], menta_id: create_contract_param[:menta_id])
            contract.update(status: create_contract_param[:status])
        else
            Contract.create(create_contract_param)
        end
        render json: contract
    end

    def update
        if contract = Contract.find(params[:id])
            contract.update(status: update_contract_param[:status])
        end
        render json: contract
    end

    def destroy
        contract.find_by(client_id: params[:client_id]).update(status: false)
    end


    
    private
    def create_contract_param
        params.require(:contract).permit(:client_id, :menta_id, :price, :status)
    end

    def update_contract_param
        params.require(:contract).permit(:status)
    end
end
