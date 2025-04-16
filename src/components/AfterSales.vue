<template>
  <div class="after-sales">
    <el-card class="sales-card">
      <template #header>
        <div class="card-header">
          <h2>资源使用须知</h2>
        </div>
      </template>
      <div class="sales-content">
        <h3>免责声明</h3>
        <p>本站提供的网页框架模板仅供个人学习和网页制作参考使用，严禁用于商业用途或其他违规行为。如因违反规定引发任何法律责任，由使用者自行承担，本站概不负责。</p>

        <h3>版权声明</h3>
        <ul>
          <li>本站仅为用户提供网页框架模板下载服务，模板中的内容（如图片、文字等）均归原始权利人所有。本站不拥有这些内容的版权，也不对此承担责任。</li>
          <li>如果您认为本站资源中的内容（包括图片或文字）侵犯了您的合法权益，请通过网站提供的联系方式联系我们，我们将立即核实并及时处理。</li>
          <li>本站资源仅供学生或个人学习参考，请勿将其用于商业用途或任何违法用途。如有违反，相关责任由使用者自行承担。
            用户在使用本站资源过程中，若产生任何争议或问题，建议根据相关法律法规妥善解决。</li>
        </ul>

      </div>
    </el-card>
  </div>
</template>

<style scoped>
  .after-sales {
    padding: 20px;

    .sales-card {
      max-width: 800px;
      margin: 0 auto;

      .card-header {
        h2 {
          margin: 0;
          font-size: 20px;
          color: #303133;
        }
      }

      .sales-content {
        h3 {
          margin: 20px 0 15px;
          font-size: 18px;
          color: #000000;
        }

        ul {
          padding-left: 20px;
          margin: 15px 0;

          li {
            margin-bottom: 10px;
            color: #606266;
            line-height: 1.6;
          }
        }

        p {
          color: #606266;
          line-height: 1.6;
          margin: 10px 0;
        }
      }
    }
  }
</style>