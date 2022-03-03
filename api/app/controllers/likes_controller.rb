class LikesController < ApplicationController
    def index
        likes = Like.where(menta_id: params[:menta_id], status: true)
        render json: likes
    end

    def create
        if none = None.find_by(client_id: create_like_param[:client_id], menta_id: create_like_param[:menta_id])
            none.delete()
        end
        if like = Like.find_by(client_id: create_like_param[:client_id], menta_id: create_like_param[:menta_id])
            like.update(status: true)
        else
            like = Like.create(create_like_param)
        end
        render json: like
    end

    private

    def create_like_param
        params.require(:like).permit(:client_id, :menta_id, :status)
    end
end
