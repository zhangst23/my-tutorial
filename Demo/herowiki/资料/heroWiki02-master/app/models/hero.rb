class Hero < ActiveRecord::Base

	belongs_to :node
	mount_uploader :image, ImageUploader

	validate :image_size

	acts_as_taggable # Alias for acts_as_taggable_on :tags
  	acts_as_taggable_on :skills, :interests

  	paginates_per 50





	private
	def image_size
		if image.size > 5.megabytes
			errors.add(image: "不能上传超过5MB的图片")
		end
	end

end
