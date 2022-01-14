class NonesController < ApplicationController
  def create
    if none = None.where(user_id: create_none_param[:user_id], menta_id: create_none_param[:menta_id])
      none.update(date: now.next_month)
    else
      none = None.create(create_none_param)
      none.update(date: now.next_month)
    end
  end

  def destroy
    if nones = None.where(user_id: create_none_param[:user_id], now >= date:)
      nones.each do |none|
        none.delete()
      end
    end
  end

  private
  def create_none_param
    params.require(:none).permit(:user_id, :menta_id)
  end
end
