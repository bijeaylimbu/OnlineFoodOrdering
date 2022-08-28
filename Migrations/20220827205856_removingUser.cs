using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineFoodOrdering.Migrations
{
    public partial class removingUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cart_AspNetUsers_UserId",
                table: "Cart");

            migrationBuilder.DropIndex(
                name: "IX_Cart_UserId",
                table: "Cart");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "13089f8f-9722-466a-9412-d6bd97bb5927");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e19ef0f0-eac5-4372-b18c-08b399dfb942");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Cart");

            migrationBuilder.AddColumn<string>(
                name: "User",
                table: "Cart",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "05184ffc-8b0f-499a-a176-bc673f7b386a", "47d3adfe-df92-454e-97ee-160671734242", "Viewer", "VIEWER" },
                    { "ece278d9-ea17-426c-9e41-83febe181896", "65d613a9-8afc-46b8-bbf3-e3add7634251", "Administrator", "ASMINISTRATOR" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "05184ffc-8b0f-499a-a176-bc673f7b386a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ece278d9-ea17-426c-9e41-83febe181896");

            migrationBuilder.DropColumn(
                name: "User",
                table: "Cart");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Cart",
                type: "text",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "13089f8f-9722-466a-9412-d6bd97bb5927", "4e7b6d3d-c658-4d74-9183-d593a972fdb0", "Administrator", "ASMINISTRATOR" },
                    { "e19ef0f0-eac5-4372-b18c-08b399dfb942", "84852a29-e8aa-4b16-8b99-584ab36dc078", "Viewer", "VIEWER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cart_UserId",
                table: "Cart",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cart_AspNetUsers_UserId",
                table: "Cart",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
