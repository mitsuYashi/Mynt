class MentaController < ApplicationController
    def index
        menta = Menta.find_by(uid: params[uid])
        render json: menta
    end

    def create
        if menta = Menta.find_by(uid: create_menta_param[:uid])
        else
            menta = Menta.create(create_menta_param, status: 1)
        end
        render json: menta
    end

    private
    
    def create_menta_param
        params.require(:menta).permit(:uid, :mail, :name)
    end

end