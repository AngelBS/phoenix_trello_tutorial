defmodule PhoenixTrello.User do
  use PhoenixTrello.Web, :model
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :first_name, :string, virtual: true
    field :last_name, :string
    field :email, :string
    field :encrypted_password, :string

    timestamps
  end

  @required_fields ~w(first_name last_name email password)
  @optional_fields ~w(encrypted_password)
  @derive {Poison.Encoder, only: [:id, :first_name, :last_name, :email]}

  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> validate_format(:email, ~r/@/)
    |> validate_length(:password, min: 5)
    |> validate_confirmation(:password, message: "Las contraseñas no coinciden")
    |> unique_constraint(:email, message: "Ya existe un usuario con ese Mail, seguramente es tu clon malvado")
    |> generate_encrypted_password
  end

  defp generate_encrypted_password(current_changeset) do
    case current_changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: password}} ->
        put_change(current_changeset, :encrypted_password, Comeonin.Bcrypt.hashpwsalt(password))
      _ ->
        current_changeset
    end
  end
end