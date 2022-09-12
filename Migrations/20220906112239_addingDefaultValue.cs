using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineFoodOrdering.Migrations
{
    public partial class addingDefaultValue : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b57093d7-55af-4a8c-8068-d71d8f286260");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f6ed98b0-33dd-4f99-808b-c4c90a39755c");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "e0f0532a-a964-4d54-83e7-6a3f9e7d03b5", "25bd9f0f-c492-40b0-92fd-06a8a969778d", "Administrator", "ASMINISTRATOR" },
                    { "fb50a645-cd53-43fa-bfd3-3a3c70d69cbe", "b05ed1f6-a048-468d-90e7-c5e5e153092f", "Viewer", "VIEWER" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e0f0532a-a964-4d54-83e7-6a3f9e7d03b5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fb50a645-cd53-43fa-bfd3-3a3c70d69cbe");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "b57093d7-55af-4a8c-8068-d71d8f286260", "e7c7db1e-750a-4282-b694-e17c02dabbb3", "Viewer", "VIEWER" },
                    { "f6ed98b0-33dd-4f99-808b-c4c90a39755c", "9772b504-607c-4d6c-bb25-aa0de9cbebbf", "Administrator", "ASMINISTRATOR" }
                });
        }
    }
}
