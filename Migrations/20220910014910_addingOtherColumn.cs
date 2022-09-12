using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineFoodOrdering.Migrations
{
    public partial class addingOtherColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3b29a1b7-6985-4050-9c6b-6bed5207a18a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "79ae9d95-9d37-45c4-868e-170cc9096dec");

            migrationBuilder.AlterColumn<DateTime>(
                name: "AddedToCartDateTime",
                table: "Cart",
                type: "timestamp without time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AddColumn<string>(
                name: "Delivery",
                table: "Cart",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Purchase",
                table: "Cart",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4bd10c8f-5e8a-470a-b170-87b4ba11a83f", "9bbe46b5-8a58-45b8-b4e4-60bd68a65520", "Viewer", "VIEWER" },
                    { "8fcd7e1e-4d2b-4133-b96b-8a16d91dbc81", "2240a232-234e-45b6-b650-f1b0f9cc7394", "Administrator", "ASMINISTRATOR" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4bd10c8f-5e8a-470a-b170-87b4ba11a83f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8fcd7e1e-4d2b-4133-b96b-8a16d91dbc81");

            migrationBuilder.DropColumn(
                name: "Delivery",
                table: "Cart");

            migrationBuilder.DropColumn(
                name: "Purchase",
                table: "Cart");

            migrationBuilder.AlterColumn<DateTime>(
                name: "AddedToCartDateTime",
                table: "Cart",
                type: "timestamp with time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3b29a1b7-6985-4050-9c6b-6bed5207a18a", "0e37b4f3-da1b-417c-bcac-922471313b52", "Viewer", "VIEWER" },
                    { "79ae9d95-9d37-45c4-868e-170cc9096dec", "f9bc66a5-f7c7-49a1-8ffc-ffd72fb600e1", "Administrator", "ASMINISTRATOR" }
                });
        }
    }
}
