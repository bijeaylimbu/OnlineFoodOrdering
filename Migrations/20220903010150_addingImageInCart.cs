using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineFoodOrdering.Migrations
{
    public partial class addingImageInCart : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "468c2d8d-d79a-4bc8-b51b-6ce910161862");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "de207088-913f-49ce-8946-1353f7f42dc4");

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Cart",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "47dfadf2-1efb-4c80-b624-5019b044e813", "f293bcce-b085-4a47-8b65-c7f95c3bdd41", "Viewer", "VIEWER" },
                    { "d3209032-fb0c-4ee3-af65-eef4f018477a", "9cb5859f-e432-4e34-80b3-2111e46a35d3", "Administrator", "ASMINISTRATOR" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "47dfadf2-1efb-4c80-b624-5019b044e813");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d3209032-fb0c-4ee3-af65-eef4f018477a");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Cart");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "468c2d8d-d79a-4bc8-b51b-6ce910161862", "33f1822a-2f84-4adf-a07c-203f64da7414", "Viewer", "VIEWER" },
                    { "de207088-913f-49ce-8946-1353f7f42dc4", "322a84c5-78f0-4bae-bf71-2bb2e6aa6d02", "Administrator", "ASMINISTRATOR" }
                });
        }
    }
}
