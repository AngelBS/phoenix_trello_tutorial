defmodule PhoenixTrello.Router do
  use PhoenixTrello.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  scope "/", PhoenixTrello do
    pipe_through :browser
    get "*path", PageController, :index
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", PhoenixTrello do
    pipe_through :api

  scope "/v1" do
    post "/registrations", RegistrationController, :create
  end
end

  # Other scopes may use custom stacks.
  # scope "/api", PhoenixTrello do
  #   pipe_through :api
  # end
end
