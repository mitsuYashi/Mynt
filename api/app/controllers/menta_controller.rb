class MentaController < ApplicationController
    def index
        menta = Mentum.find_by(uuid: params[uuid])
        render json: menta
    end

    def create
        if user = User.find_by(uuid: create_menta_param[:uuid])
        else
            user = User.create(create_menta_param)
        end
        if menta = Mentum.find_by(uuid: create_menta_param[:uuid])
        else
            menta = Mentum.create(create_menta_param)
        end
        render json: menta
    end

    private
    
    def create_menta_param
        params.require(:menta).permit(:uuid, :mail, :name)
    end

end