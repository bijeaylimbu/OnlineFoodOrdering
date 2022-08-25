using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace OnlineFoodOrdering.Migrations
{
    public partial class addingCatogory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "54b6d337-3d14-4680-a65d-d5ecef481dac");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d60dac0b-8710-4a24-99e6-9e2d66d1a8d5");

            migrationBuilder.DropColumn(
                name: "FoodCategory",
                table: "Product");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Product",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Category", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "72ab23be-c964-41dd-8e53-aa8f1f8e3e87", "723664fb-8d2c-4909-8fe2-73f01c8c175a", "Viewer", "VIEWER" },
                    { "949613ed-0d37-4e7f-84a2-8f93361dc460", "638ba984-dc7b-482e-9cfb-47588e8a9919", "Administrator", "ASMINISTRATOR" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Category");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "72ab23be-c964-41dd-8e53-aa8f1f8e3e87");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "949613ed-0d37-4e7f-84a2-8f93361dc460");

            migrationBuilder.DropColumn(
                name: "Category",
                table: "Product");

            migrationBuilder.AddColumn<int>(
                name: "FoodCategory",
                table: "Product",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "54b6d337-3d14-4680-a65d-d5ecef481dac", "1cdae06f-1dbc-4589-863c-ba8366e70855", "Administrator", "ASMINISTRATOR" },
                    { "d60dac0b-8710-4a24-99e6-9e2d66d1a8d5", "87490f26-53b7-46ae-8336-8dc20c139d5c", "Viewer", "VIEWER" }
                });
        }
    }
}
