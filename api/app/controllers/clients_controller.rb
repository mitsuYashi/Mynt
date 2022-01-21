class ClientsController < ApplicationController
    def index
        if client = Client.joins(user).find_by(user_id: params[:uuid])
            render json: {
                client_category: "client",
                uuid: client.user_id,
                birth: client.birth,
                name: client.name
            }
        end
    end

    def create
        client = Client.find_by(user_id: create_client_param[:uuid])
        user = User.find_by(uuid: create_client_param[:uuid])
        if client.nil? && Mentum.find_by(user_id: create_client_param[:uuid]).nil?
            user = User.create(create_client_param)
            client = Client.create(user_id: create_client_param[:uuid])
        end
        render json: {client: client, user: user}
    end

    private
    
    def create_client_param
        params.require(:client).permit(:uuid, :mail, :name)
    end

end
