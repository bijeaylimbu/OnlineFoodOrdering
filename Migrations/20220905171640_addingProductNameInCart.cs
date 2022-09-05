using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineFoodOrdering.Migrations
{
    public partial class addingProductNameInCart : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "47dfadf2-1efb-4c80-b624-5019b044e813");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d3209032-fb0c-4ee3-af65-eef4f018477a");

            migrationBuilder.AddColumn<string>(
                name: "ProductName",
                table: "Cart",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "b57093d7-55af-4a8c-8068-d71d8f286260", "e7c7db1e-750a-4282-b694-e17c02dabbb3", "Viewer", "VIEWER" },
                    { "f6ed98b0-33dd-4f99-808b-c4c90a39755c", "9772b504-607c-4d6c-bb25-aa0de9cbebbf", "Administrator", "ASMINISTRATOR" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b57093d7-55af-4a8c-8068-d71d8f286260");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f6ed98b0-33dd-4f99-808b-c4c90a39755c");

            migrationBuilder.DropColumn(
                name: "ProductName",
                table: "Cart");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "47dfadf2-1efb-4c80-b624-5019b044e813", "f293bcce-b085-4a47-8b65-c7f95c3bdd41", "Viewer", "VIEWER" },
                    { "d3209032-fb0c-4ee3-af65-eef4f018477a", "9cb5859f-e432-4e34-80b3-2111e46a35d3", "Administrator", "ASMINISTRATOR" }
                });
        }
    }
}
