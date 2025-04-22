using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FreelanceApi.Migrations
{
    /// <inheritdoc />
    public partial class AddBusinessCardFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BusinessImage",
                table: "BusinessCards",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "BusinessCards",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BusinessImage",
                table: "BusinessCards");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "BusinessCards");
        }
    }
}
