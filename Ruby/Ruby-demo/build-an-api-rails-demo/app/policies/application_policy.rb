class ApplicationPolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  def index?
    false
  end

  def show?
    scope.where(:id => record.id).exists?
  end

  def create?
    false
  end

  def new?
    create?
  end

  def update?
    return true if user.admin?
    return true if record.id == user.id
  end

  def edit?
    update?
  end

  def destroy?
    return true if user.admin?
    return true if record.id == user.id
  end

  def scope
    Pundit.policy_scope!(user, record.class)
  end

  class Scope < ApplicationPolicy::Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      scope.all
    end
  end
end
