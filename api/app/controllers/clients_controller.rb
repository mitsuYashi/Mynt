class ClientsController < ApplicationController
    def index
        if client = Client.joins(user).find_by(uuid: params[:uuid])
            render json: {
                client_category: "client",
                uuid: client.uuid,
                birth: client.birth,
                name: client.name
            }
        end
    end

    def create
        client = Client.find_by(uuid: create_client_param[:uuid])
        if client.nil? && Mentum.find_by(uuid: create_client_param[:uuid]).nil?
            user = User.create(create_client_param)
            client = Client.create(uuid: create_client_param[:uuid])
        end
        render json: {client: client, user: user}
    end

    private
    
    def create_client_param
        params.require(:client).permit(:uuid, :mail, :name)
    end

end
