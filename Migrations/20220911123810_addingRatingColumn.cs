using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineFoodOrdering.Migrations
{
    public partial class addingRatingColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4bd10c8f-5e8a-470a-b170-87b4ba11a83f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8fcd7e1e-4d2b-4133-b96b-8a16d91dbc81");

            migrationBuilder.AddColumn<int>(
                name: "Rating",
                table: "Product",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5c65f8a5-1f25-4821-bf22-f105d3f0963d", "df8b2285-7f4e-4878-9426-064ce1f900b6", "Administrator", "ASMINISTRATOR" },
                    { "bd24161a-65e4-4731-be52-363da0acc34e", "42b8bc32-82b3-4bfc-81e0-42a67996b5f0", "Viewer", "VIEWER" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5c65f8a5-1f25-4821-bf22-f105d3f0963d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bd24161a-65e4-4731-be52-363da0acc34e");

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Product");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4bd10c8f-5e8a-470a-b170-87b4ba11a83f", "9bbe46b5-8a58-45b8-b4e4-60bd68a65520", "Viewer", "VIEWER" },
                    { "8fcd7e1e-4d2b-4133-b96b-8a16d91dbc81", "2240a232-234e-45b6-b650-f1b0f9cc7394", "Administrator", "ASMINISTRATOR" }
                });
        }
    }
}
