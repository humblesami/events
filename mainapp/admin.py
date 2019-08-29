import nested_admin


class BaseAdmin(nested_admin.NestedModelAdmin):
    exclude = ('created_at', 'created_by', 'updated_at', 'updated_by')


class BaseInlineAdmin(nested_admin.NestedStackedInline):
    exclude = ('created_at', 'created_by', 'updated_at', 'updated_by')