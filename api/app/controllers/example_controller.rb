class ExampleController < ApplicationController
    def index
        
        render json:{ num: [1, 2, 3] }
    end

    def create
        user = User.new(user_create_params);
        if user.save
            render json:{ status: "SUCCESS" }
        else 
            render json:{ status: 422, error: user.errors }
        end
    end

    def show
        
    end

    def update
    end

    def destroy
    end

    private 
    def user_create_params
        params.require(:user).premit(:id, :name);
    end
end
