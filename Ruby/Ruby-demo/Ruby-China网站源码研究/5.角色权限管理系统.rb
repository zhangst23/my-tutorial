5.角色权限管理系统.rb
cancancan

class Ability
  include CanCan::Ability

  def initialize(user)
  	if user.blank? =

  	elsif user.has_role?(:admin)

  	elsif user.has_role?(:member)

  	else

  	end
  end

  protected

  def basic_read_only
  	~
  end








