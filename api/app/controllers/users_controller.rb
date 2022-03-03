class UsersController < ApplicationController
    def index
        if user = Mentum.joins(:user).select(:name, :profile, :birth, :url, :user_id).find_by(user_id: params[:uuid])
            profile = {
                user: user,
                userType: "menta"
            }
        elsif user = Client.joins(:user).select(:name, :profile, :birth, :user_id).find_by(user_id: params[:uuid])
            profile = {
                user: user,
                userType: "client"
            }
        end
        render json: profile
    end

    def create

    end

    def update
        if update_user_param[:userType] == "menta"
            user = User.find_by(uuid: params[:id])
            mentum = Mentum.find_by(user_id: params[:id])
            user.update(name: update_user_param[:name], birth: update_user_param[:birth])
            mentum.update(profile: update_user_param[:profile], url: update_user_param[:url])
            render json: { status: "menta update" }
        elsif update_user_param[:userType] == "client"
            user = User.find_by(uuid: params[:id])
            client = Client.find_by(user_id: params[:id])

            user.update(name: update_user_param[:name], birth: update_user_param[:birth])
            client.update(profile: update_user_param[:profile])
            render json: { status: "client update" }
        end
    end

    private
    
    def create_user_param
        params.require(:user).permit(:uuid, :name, :mail)
    end

    def update_user_param
        params.require(:user).permit(:userType, :name, :birth, :profile, :url)
    end

end
