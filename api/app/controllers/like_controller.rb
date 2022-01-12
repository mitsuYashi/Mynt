class LikeController < ApplicationController
    def index
        render json: create_like_param[:status]
    end

    def create
        Like.where(user_id: {uuid}, menta_id: {uuid})
    end
    

    def show
        @like = Like.find(params[:id])
    end

    private

    def create_like_param
        params.require(:like).permit(:status)
    end
end
