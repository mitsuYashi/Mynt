class MentaController < ApplicationController
    def index
        if menta = Mentum.joins(:user).select(:name, :uuid, :profile, :url).find_by(uuid: params[:uuid])
            render json: {
                user_category: "menta",
                name: menta.name,
                uuid: menta.uuid,
                profile: menta.profile,
                url: menta.url
            }
        else
            render json: {error: "not exist"}
        end
    end

    def create
        mentum = Mentum.find_by(uuid: create_menta_param[:uuid])
        user = User.find_by(uuid: create_menta_param[:uuid])
        if Client.find_by(uuid: create_menta_param[:uuid]).nil? && mentum.nil?
            user = User.create(create_menta_param)
            mentum = Mentum.create(uuid: user.uuid)
        end
        render json: {mentum: mentum, user: user}
    end

    private
    
    def create_menta_param
        params.require(:menta).permit(:uuid, :mail, :name)
    end

end