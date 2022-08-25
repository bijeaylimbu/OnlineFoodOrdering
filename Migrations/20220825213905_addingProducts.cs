using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace OnlineFoodOrdering.Migrations
{
    public partial class addingProducts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1ae9d263-5078-488d-8ba2-8de813652a12");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3ed2ecee-aeda-4120-bb97-23cfe0a1ad36");

            migrationBuilder.CreateTable(
                name: "Product",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ProductName = table.Column<string>(type: "text", nullable: false),
                    Price = table.Column<int>(type: "integer", nullable: false),
                    Image = table.Column<string>(type: "text", nullable: false),
                    Quantity = table.Column<int>(type: "integer", nullable: false),
                    FoodCategory = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Product", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "54b6d337-3d14-4680-a65d-d5ecef481dac", "1cdae06f-1dbc-4589-863c-ba8366e70855", "Administrator", "ASMINISTRATOR" },
                    { "d60dac0b-8710-4a24-99e6-9e2d66d1a8d5", "87490f26-53b7-46ae-8336-8dc20c139d5c", "Viewer", "VIEWER" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Product");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "54b6d337-3d14-4680-a65d-d5ecef481dac");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d60dac0b-8710-4a24-99e6-9e2d66d1a8d5");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1ae9d263-5078-488d-8ba2-8de813652a12", "8aaa4b27-7bd0-4c05-be10-7c303a8571ea", "Viewer", "VIEWER" },
                    { "3ed2ecee-aeda-4120-bb97-23cfe0a1ad36", "e8d907a4-a056-4061-acba-b85733fb97a2", "Administrator", "ASMINISTRATOR" }
                });
        }
    }
}
